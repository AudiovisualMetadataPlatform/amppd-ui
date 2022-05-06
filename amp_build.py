#!/bin/env python3
#
# Build the amp-mgms tarball for distribution
#

import argparse
import logging
import tempfile
from pathlib import Path
import shutil
import sys
import yaml
from datetime import datetime
import os
import subprocess
import tarfile
import time
import io
import zipfile
import json
#from amp_bootstrap_utils import run_cmd, build_package

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--debug', default=False, action='store_true', help="Turn on debugging")
    parser.add_argument('--version', default=None, help="Package Version")  
    parser.add_argument('--package', default=False, action='store_true', help="build a package instead of installing")
    parser.add_argument('--clean', default=False, action='store_true', help="Clean previous build & dependencies")
    parser.add_argument('destdir', help="Output directory for package or webserver path root", nargs='?')
    args = parser.parse_args()
    logging.basicConfig(format="%(asctime)s [%(levelname)-8s] (%(filename)s:%(lineno)d)  %(message)s",
                        level=logging.DEBUG if args.debug else logging.INFO)

    if args.package and not args.destdir:
        logging.error("You must supply a destdir when building a package")
        exit(1)

    logging.info("Building Site")
    

    os.chdir(sys.path[0])
    logging.info("Installing npm modules")
    if args.clean:
        shutil.rmtree("node_modules", ignore_errors=True)
    subprocess.run(["npm", "install"], check=True)

    logging.info("Building distribution")
    if args.clean:
        shutil.rmtree("dist", ignore_errors=True)
    subprocess.run(["./node_modules/.bin/vue-cli-service", "build"], check=True)

    if not args.package:
        logging.info(f"UI code is in dist directory")
    else:
        destdir = Path(args.destdir).resolve()
        buildtime = datetime.now().strftime("%Y%m%d_%H%M%S")
        if args.version is None:
            # look in package.json to see if there's a version string...
            try:
                with open("package.json") as f:
                    jdata = json.load(f)
                    if 'version' in jdata:
                        args.version = jdata['version']
                    else:
                        args.version = buildtime
            except:            
                args.version = buildtime
        basedir = f"amp_ui-{args.version}"
        pkgfile = Path(destdir, f"{basedir}.tar")
        

        with tarfile.open(pkgfile, "w") as tfile:
            # create base directory
            base_info = tarfile.TarInfo(name=basedir)
            base_info.mtime = int(time.time())
            base_info.type = tarfile.DIRTYPE
            base_info.mode = 0o755
            tfile.addfile(base_info, None)
            
            
            # write metadata file
            metafile = tarfile.TarInfo(name=f"{basedir}/amp_package.yaml")
            metafile_data = yaml.safe_dump({
                'name': 'amp_ui',
                'version': args.version,
                'build_date': buildtime,
                'install_path': 'tomcat/webapps'
            }).encode('utf-8')
            metafile.size = len(metafile_data)
            metafile.mtime = int(time.time())
            metafile.mode = 0o644
            tfile.addfile(metafile, io.BytesIO(metafile_data))

            # create the data directory
            data_info = tarfile.TarInfo(name=f'{basedir}/data')
            data_info.mtime = int(time.time())
            data_info.type = tarfile.DIRTYPE
            data_info.mode = 0o755
            tfile.addfile(data_info, None)

            # create a zip file of the data
            zipdata = io.BytesIO()
            with zipfile.ZipFile(zipdata, mode="w", compression=zipfile.ZIP_DEFLATED) as z:
                dist_dir = Path('./dist')
                for f in dist_dir.glob("**/*"):
                    if f.is_file():
                        logging.debug(f"Adding {f!s} -> {f.relative_to(dist_dir)!s} to war")
                        z.write(f, f"{str(f.relative_to(dist_dir))}")
                    else:
                        logging.debug(f"Skipping file: {f!s}")

            logging.debug("Adding ROOT.war to tarball")
            war_info = tarfile.TarInfo(name=f"{basedir}/data/ROOT.war")
            war_info.mtime = int(time.time())
            war_info.mode = 0o644
            war_info.size = len(zipdata.getvalue())
            tfile.addfile(war_info, io.BytesIO(zipdata.getvalue()))
            
            logging.info(f"Build complete.  Package is in: {pkgfile}")

if __name__ == "__main__":
    main()
