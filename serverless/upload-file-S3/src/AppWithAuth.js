import React, { Component } from "react";
import App from "./App";
import Amplify from 'aws-amplify';
import { Auth, I18n } from "aws-amplify";
import { Authenticator, Greetings } from "aws-amplify-react";
import vocabularies from "./i18n/vocabularies";
import awsmobile from './aws-exports';
import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

Amplify.configure(awsmobile);
I18n.putVocabularies(vocabularies);
I18n.setLanguage("ja");

window.sessionStorage.setItem("aws.amplify.test-ss", 1);

Auth.configure({
    storage: window.sessionStorage
});

class AppWithAuth extends Component {

    render() {
        const theme = createMuiTheme({
            palette: {
                type: "light",
                primary: {
                    light: "#005bac",
                    main: "#005bac",
                    dark: "#005bac"
                },
                secondary: blueGrey
            },
            typography: {
                useNextVariants: true,
                fontFamily: ["Amazon Ember"].join(",")
            },
            overrides: {
                ReactTableComp: {
                    responsiveScroll: {
                        maxHeight: "none"
                    }
                }
            }
        });

        return (
            <div>
                <Authenticator
                    theme={{
                        ...theme,
                        button: {
                            backgroundColor: theme.palette.primary.main
                        }
                    }}
                    hide={[Greetings]}
                    signUpConfig={{ hiddenDefaults: ["phone_number"] }}
                >
                    <App />
                </Authenticator>
            </div>
        );
    }
}

export default AppWithAuth;