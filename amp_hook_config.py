
def config_ui(config, args):    
    # the UI bits are configured with these variables in javascript...    
    vars = {'VUE_APP_DISABLE_AUTH': config['ui'].get('disable_auth', 'false'),
            'VUE_APP_AMP_UNIT': config['ui']['unit'],
            'VUE_APP_USER_GUIDE': config['ui']['user_guide_url']}
            

    if config['amp'].get('use_https', False):
        vars['VUE_APP_AMP_URL'] = f"https://{config['amp']['host']}/rest"
        vars['VUE_APP_GALAXY_WORKFLOW_URL'] = f"https://{config['amp']['host']}/rest/galaxy/workflow/editor?id="
    else:
        vars['VUE_APP_AMP_URL'] = f"http://{config['amp']['host']}:{config['amp']['port']}/rest"
        vars['VUE_APP_GALAXY_WORKFLOW_URL'] = f"http://{config['amp']['host']}:{config['amp']['port']}/rest/galaxy/workflow/editor?id="




    # config.js holds the values we need
    with open(amp_root / "tomcat/webapps/ROOT/config.js", "w") as f:
        f.write("// automatically generated, do not edit\n")
        f.write("window.config = {\n")
        for v in vars:
            f.write(f'    "{v}": "{vars[v]}",\n')
        f.write('    "AUTO": 1\n')
        f.write("}\n")

