import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Connexion.module.scss";
import { useForm } from "react-hook-form";
import { useAuth } from '../../Components/AuthContext/AuthContext';
import { getUserByEmail } from '../../api/user';

function Connexion() {
  const [feedback, setFeedback] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submit = async (values) => {
    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      const res = await getUserByEmail(user); 
      
      if (res.message === "Erreur") {
        setFeedback("Identifiant ou mot de passe incorrecte");
      } else {
        login(res.user);
        setFeedback("Connexion réussie");
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setFeedback("Une erreur s'est produite lors de la connexion.");
    }
  };
    return (
        <div className={styles.connexionMain}>
            <form onSubmit={handleSubmit(submit)}>

                <div>
                    <label>Email : 
                        <input type="text" {...register("email", {required : true})} />
                    </label>
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Mot de passe : 
                        <input type="password" {...register("password", {required : true})} />
                    </label>
                    {errors.password && <p>Ce champs est requis.</p>}
                </div>

                {feedback && <p className={styles.feedbackMessage}>{feedback}</p>}

                <button >Connexion</button>
                <button><Link to ="/nouveaucompte">Créer un nouveau compte</Link></button>
            </form>
            <Link to ="/cgu">Accéder aux CGU</Link>
        </div>
    )
}

export default Connexion;