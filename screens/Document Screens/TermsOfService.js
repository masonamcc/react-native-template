import {View, Text, SafeAreaView, ScrollView} from "react-native";
import {uniStyles} from "../../Styles/uniStyles";
import appConfig from "../../appConfiguration.json"

export default function TermsOfService() {
    return (
        <SafeAreaView style={uniStyles.safeAreaView}>

            <ScrollView>

                <View style={[uniStyles.fullwidth, uniStyles.p2]} >

                    <View style={uniStyles.mb2}>
                        <Text style={uniStyles.h5}>1. Acceptance of Terms</Text>
                        <Text>
                            By accessing or using this app, you agree to be bound by these Terms of Service.
                            If you do not agree, please do not use the app.
                        </Text>
                    </View>

                    <View style={uniStyles.mb2}>
                        <Text style={uniStyles.h5}>2. Use of the App</Text>
                        <Text>
                            You agree to use the app only for lawful purposes and in accordance with these Terms.
                            You must not misuse the app or attempt to harm its security or performance.
                        </Text>
                    </View>

                    <View style={uniStyles.mb2}>
                        <Text style={uniStyles.h5}>3. Intellectual Property</Text>
                        <Text>
                            All content, trademarks, and data within the app are owned by us or our licensors.
                            You may not copy, modify, or distribute any part of the app without permission.
                        </Text>
                    </View>

                    <View style={uniStyles.mb2}>
                        <Text style={uniStyles.h5}>4. Limitation of Liability</Text>
                        <Text>
                            We are not responsible for any direct, indirect, or incidental damages resulting from
                            your use of the app. Use at your own risk.
                        </Text>
                    </View>

                    <View style={uniStyles.mb2}>
                        <Text style={uniStyles.h5}>5. Changes to Terms</Text>
                        <Text>
                            We reserve the right to update or modify these Terms at any time. Continued use of the
                            app after changes means you accept the new Terms.
                        </Text>
                    </View>

                    <View style={uniStyles.mb2}>
                        <Text style={uniStyles.h5}>6. Contact Us</Text>
                        <Text>
                            If you have any questions about these Terms, contact us at {appConfig.businessInfo.supportEmail}
                        </Text>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}