import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import './material-ui.css';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Toolbar/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Radio/style.css';
import 'preact-material-components/FormField/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Checkbox/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/Tabs/style.css';
import 'preact-material-components/Theme/style.css';

//based on https://hackya.com/us/how-to-use-system-font/
export default () => injectGlobal`
  ${styledNormalize}
    @font-face {
        font-family: system;
        font-style: normal;
        font-weight: 300;
        src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
    }

    @font-face {
        font-family: system;
        font-style: italic;
        font-weight: 300;
        src: local(".SFNSText-LightItalic"), local(".HelveticaNeueDeskInterface-Italic"), local(".LucidaGrandeUI"), local("Ubuntu Light Italic"), local("Segoe UI Light Italic"), local("Roboto-LightItalic"), local("DroidSans"), local("Tahoma");
    }

    @font-face {
        font-family: system;
        font-style: normal;
        font-weight: 400;
        src: local(".SFNSText-Regular"), local(".HelveticaNeueDeskInterface-Regular"), local(".LucidaGrandeUI"), local("Ubuntu"), local("Segoe UI"), local("Roboto-Regular"), local("DroidSans"), local("Tahoma");
    }

    @font-face {
        font-family: system;
        font-style: italic;
        font-weight: 400;
        src: local(".SFNSText-Italic"), local(".HelveticaNeueDeskInterface-Italic"), local(".LucidaGrandeUI"), local("Ubuntu Italic"), local("Segoe UI Italic"), local("Roboto-Italic"), local("DroidSans"), local("Tahoma");
    }

    @font-face {
        font-family: system;
        font-style: normal;
        font-weight: 500;
        src: local(".SFNSText-Medium"), local(".HelveticaNeueDeskInterface-MediumP4"), local(".LucidaGrandeUI"), local("Ubuntu Medium"), local("Segoe UI Semibold"), local("Roboto-Medium"), local("DroidSans-Bold"), local("Tahoma Bold");
    }

    @font-face {
        font-family: system;
        font-style: italic;
        font-weight: 500;
        src: local(".SFNSText-MediumItalic"), local(".HelveticaNeueDeskInterface-MediumItalicP4"), local(".LucidaGrandeUI"), local("Ubuntu Medium Italic"), local("Segoe UI Semibold Italic"), local("Roboto-MediumItalic"), local("DroidSans-Bold"), local("Tahoma Bold");
    }

    @font-face {
        font-family: system;
        font-style: normal;
        font-weight: 700;
        src: local(".SFNSText-Bold"), local(".HelveticaNeueDeskInterface-Bold"), local(".LucidaGrandeUI"), local("Ubuntu Bold"), local("Roboto-Bold"), local("DroidSans-Bold"), local("Segoe UI Bold"), local("Tahoma Bold");
    }

    @font-face {
        font-family: system;
        font-style: italic;
        font-weight: 700;
        src: local(".SFNSText-BoldItalic"), local(".HelveticaNeueDeskInterface-BoldItalic"), local(".LucidaGrandeUI"), local("Ubuntu Bold Italic"), local("Roboto-BoldItalic"), local("DroidSans-Bold"), local("Segoe UI Bold Italic"), local("Tahoma Bold");
    }

    html, body {
        font-family: system, "Segoe UI", Tahoma;
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        background: #FAFAFA;
        font-weight: 400;
        color: #444;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;        
    }

    body {
        background-image: url(../assets/marvel.gif);
    }
    
    .mdc-text-field__label--float-above {
        bottom: 1em;
    }
`;
