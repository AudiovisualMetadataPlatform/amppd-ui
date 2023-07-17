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
import os
import subprocess
import zipfile
import json
from amp.package import *

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--debug', default=False, action='store_true', help="Turn on debugging")
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
        subprocess.run(["cp", "-av", sys.path[0] + "/dist/.", args.destdir], check=True)        
        logging.info(f"UI code is in {args.destdir}")
        exit(0)

    with tempfile.TemporaryDirectory() as builddir:
        # create a zip file of the data        
        with zipfile.ZipFile(builddir + "/ROOT.war", mode="w", compression=zipfile.ZIP_DEFLATED) as z:
            dist_dir = Path('./dist')
            for f in dist_dir.glob("**/*"):
                if f.is_file():
                    logging.debug(f"Adding {f!s} -> {f.relative_to(dist_dir)!s} to war")
                    z.write(f, f"{str(f.relative_to(dist_dir))}")
                else:
                    logging.debug(f"Skipping file: {f!s}")
        
        version = "0.0.unknown"
        try:
            with open("package.json") as f:
                jdata = json.load(f)
                if 'version' in jdata:
                    version = jdata['version']
        except:            
            pass

        pfile = create_package("amp_ui", version, "tomcat/webapps",
                               Path(args.destdir), Path(builddir),
                               hooks={'post': 'amp_hook_post.py',
                                      'config': 'amp_hook_config.py'},
                               user_defaults='amp_config.user_defaults',
                               depends_on='tomcat')
                            
        logging.info(f"New package is in {pfile}")


if __name__ == "__main__":
    main()
