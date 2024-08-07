#!/bin/env python3
from amp.logging import setup_logging
import argparse
import logging
import zipfile
import shutil
import os
from pathlib import Path

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--debug', default=False, action='store_true', help="Enable debugging")
    parser.add_argument('install_path', help="Where the package will be installed")
    args = parser.parse_args()

    setup_logging(None, args.debug)

    # manually deploy the servlet if it is the UI or REST
    amp_root = Path(os.environ['AMP_ROOT'])    
    warfile = amp_root / 'tomcat/webapps/ROOT.war'
    deployroot = amp_root / 'tomcat/webapps/ROOT'
    logging.info(f"Deploying war file: {warfile!s} -> {deployroot!s}")
    # remove everything in the deploy root
    if deployroot.exists():
        logging.debug("Removing previous deployment")
        shutil.rmtree(deployroot)
    with zipfile.ZipFile(warfile, 'r') as zfile:
        zfile.extractall(deployroot)
    warfile.unlink()



if __name__ == "__main__":
    main()

