

    export function setUserInfo(username)
    {
      // Get the existing session data from localStorage
      const sessionData = JSON.parse(localStorage.getItem('sessionData')) || {};
    
      // Store the user information in the sessionData
      console.log("session username",username)
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

    export function getSessionId() {
      let sessionId = localStorage.getItem('sessionId');
  
      if (!sessionId) {
          // Generate a unique session ID
          sessionId = Date.now().toString();
  
          // Store the session ID in localStorage
          localStorage.setItem('sessionId', sessionId);
      }
  
      return sessionId;
  }
  
