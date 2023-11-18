

    export function setUserInfo(username)
    {
      // Get the existing session data from localStorage
      const sessionData = JSON.parse(localStorage.getItem('sessionData')) || {};
    
      // Store the user information in the sessionData
      sessionData[getSessionId()] = { username };
    
      // Update the sessionData in localStorage
      localStorage.setItem('sessionData', JSON.stringify(sessionData));
    }
    
    export function getUserInfo(){
          // Get the sessionData from localStorage
      const sessionData = JSON.parse(localStorage.getItem('sessionData')) || {};
    
      // Get the user information for the current session
      return sessionData[getSessionId()] || {};
    }

    export function getSessionId(){
        if (!localStorage.getItem('sessionId') && !localStorage.getItem('sessionId').username !== Date.now().toString() ) {
            localStorage.setItem('sessionId', Date.now().toString());
          }
        
          return localStorage.getItem('sessionId');
    }

