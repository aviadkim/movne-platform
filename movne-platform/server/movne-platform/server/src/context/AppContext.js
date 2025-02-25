import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define initial state
const initialState = {
  user: null,
  clientId: null,
  isLoading: false,
  error: null,
  lastTranscription: null,
};

// Define action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  SET_CLIENT: 'SET_CLIENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_TRANSCRIPTION: 'SET_TRANSCRIPTION',
};

// Create reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.SET_CLIENT:
      return { ...state, clientId: action.payload };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    case ActionTypes.SET_TRANSCRIPTION:
      return { ...state, lastTranscription: action.payload };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Create provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const setUser = (user) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  };

  const setClient = (clientId) => {
    dispatch({ type: ActionTypes.SET_CLIENT, payload: clientId });
    // Store in localStorage for persistence
 if (clientId) {
      localStorage.setItem('clientId', clientId);
    } else {
      localStorage.removeItem('clientId');
    }
  };

  const setLoading = (isLoading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  const setTranscription = (transcription) => {
    dispatch({ type: ActionTypes.SET_TRANSCRIPTION, payload: transcription });
  };

  // Load stored client ID if available
  useEffect(() => {
    const storedClientId = localStorage.getItem('clientId');
    if (storedClientId) {
      setClient(storedClientId);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
        setClient,
        setLoading,
        setError,
        clearError,
        setTranscription,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
