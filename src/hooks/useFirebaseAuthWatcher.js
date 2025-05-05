import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const useFirebaseAuthWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
};

export default useFirebaseAuthWatcher;
