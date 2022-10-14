import React from "react"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import axios from "axios"
import { useDispatch } from "react-redux"
import { sendLoginGoogle } from "../store/user"
import { useNavigation } from "@react-navigation/native"

function GoogleLog() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const sucessGoogleResponse = (tokenResponse) => {
    axios
      .post(`http://localhost:8080/api/user/google/googlelogin`, {
        credential: tokenResponse.credential,
      })
      .then((result) => dispatch(sendLoginGoogle(result.data)))

    navigation.navigate("UserView")
  }

  return (
    <GoogleOAuthProvider clientId="574890731085-p6f52485otgqo15gqso2qvjca2mseqcb.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={sucessGoogleResponse}
        onError={() => {
          console.log("Login Failed")
        }}
        type="standar"
        size="large"
        text="signin"
        shape="pill"
      />
    </GoogleOAuthProvider>
  )
}

export default GoogleLog
