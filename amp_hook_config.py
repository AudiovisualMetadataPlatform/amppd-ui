#!/bin/env python3
# This script will be run when the AMP system is reconfigured.  It will
# write the configuration files that amppd needs, driven by the amp
# configuration file.
#
# No arguments, but the AMP_ROOT and AMP_DATA_ROOT environment variables
# will be set by the caller so it can find all things AMP.

import argparse
import logging
from pathlib import Path
import os
import yaml
import subprocess
from amp.config import load_amp_config
from amp.logging import setup_logging

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--debug', default=False, action='store_true', help="Turn on debugging")    
    args = parser.parse_args()

    # set up the standard logging
    setup_logging(None, args.debug)

    # grab the configuration file
    config = load_amp_config()

    # set amp_root
    amp_root = Path(os.environ['AMP_ROOT'])    

    # the UI bits are configured with these variables in javascript...    
    vars = {'VUE_APP_DISABLE_AUTH': config['ui'].get('disable_auth', 'false'),
            'VUE_APP_AMP_UNIT': config['ui']['unit'],
            'VUE_APP_USER_GUIDE': config['ui']['user_guide_url']}
            

    if False:
        if config['amp'].get('use_https', False):
            vars['VUE_APP_AMP_URL'] = f"https://{config['amp']['host']}/rest"
            vars['VUE_APP_GALAXY_WORKFLOW_URL'] = f"https://{config['amp']['host']}/rest/galaxy/workflow/editor?id="
        else:
            vars['VUE_APP_AMP_URL'] = f"http://{config['amp']['host']}:{config['amp']['port']}/rest"
            vars['VUE_APP_GALAXY_WORKFLOW_URL'] = f"http://{config['amp']['host']}:{config['amp']['port']}/rest/galaxy/workflow/editor?id="
    else:
        vars['VUE_APP_AMP_URL'] = f"/rest"
        vars['VUE_APP_GALAXY_WORKFLOW_URL'] = f"/rest/galaxy/workflow/editor?id="




    # config.js holds the values we need
    with open(amp_root / "tomcat/webapps/ROOT/config.js", "w") as f:
        f.write("// automatically generated, do not edit\n")
        f.write("window.config = {\n")
        for v in vars:
            f.write(f'    "{v}": "{vars[v]}",\n')
        f.write('    "AUTO": 1\n')
        f.write("}\n")



if __name__ == "__main__":
    main()