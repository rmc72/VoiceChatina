/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
//import useFetch from "react-fetch-hook";
import Voice, {
  SpeechResultsEvent,
//  SpeechPartialResultsEvent,
  SpeechErrorEvent
} from "@react-native-voice/voice";
import Tts from 'react-native-tts'



function App () {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');

  const [results, setResults] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  global.waitingResponse = false;

//  Tts.setDefaultLanguage('en-GB');
//  Tts.setDefaultVoice('com.apple.ttsbundle.Daniel-compact');

  useEffect(() => {
    function onSpeechResults(e: SpeechResultsEvent) {  
      Voice.stop(); 
      setResponseText(e.value[0]);
      payload = {
        'model': 'text-davinci-003',
        'prompt': e.value[0],
        'max_tokens': 200,
        'temperature': 1.0
      }

      fetch("https://api.openai.com/v1/completions", {
         method: 'POST',
         headers:{
          'content-type': 'application/json', 
          'Authorization': 'YOUR OPENAI API KEY' 
         },
         body: JSON.stringify(payload)
      }).then((result)=>{
          result.json().then((resp)=>{
            setResponseText(resp['choices'][0]['text'])
            Tts.speak(resp['choices'][0]['text'], {
              language: 'en-US',
            });
            Voice.start("en-US");
         })});

    }
  
    function onSpeechError(e: SpeechErrorEvent) {
//      console.error(e);
        Voice.start("en-US");     
    }
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
//    Voice.onSpeechPartialResults = onSpeechPartialResults;
    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  async function toggleListening() {
    
    try {
      if (isListening) {
        await Voice.stop();
        Voice.destroy().then(Voice.removeAllListeners);    
        setIsListening(false);
      } else {
        setResults([]);
        await Voice.start("en-US");
        setIsListening(true);
      }
    } catch (e) {
//      console.error(e);
    }

  }

  function handleSubmit(event)  {
    event.preventDefault();

      payload = {
        'model': 'text-davinci-003',
        'prompt': text,
        'max_tokens': 200,
        'temperature': 1.0
      }

      fetch("https://api.openai.com/v1/completions", {
         method: 'POST',
         headers:{
          'content-type': 'application/json', 
          'Authorization': 'YOUR OPENAI API KEY' 
         },
         body: JSON.stringify(payload)
      }).then((result)=>{
          result.json().then((resp)=>{
            setResponseText(resp['choices'][0]['text'])
          })
         })
  
  }

  return (
    <View style={{padding: 10}}>
      <Text>Press the button and start speaking</Text>
      <Button
        title={isListening ? "Stop Listening" : "Start Listening"}
        onPress={toggleListening}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Write here to ChatGPT!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        style={{borderWidth:2, borderColor:'skyblue', margin:20}}
      />
      <Button title="submit" onPress={(event)=>{handleSubmit(event)}}/>
      <Text style={{padding: 10, fontSize: 15}}>
        {responseText}
      </Text>
    </View>
  );
}

export default App;
