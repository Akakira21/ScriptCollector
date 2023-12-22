import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import styles from "./Connexion.module.scss";
import { useForm } from "react-hook-form";
import { useAuth } from '../../Components/AuthContext/AuthContext';


function Connexion() {

  const [feedback, setFeedback] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

    const defaultValues = {
        email: "",
        password: "",
      };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues,
        mode: "onChange",
      });


      async function submit(values) {
        console.log(values);
        let user = {
          email: values.email,
          password: values.password,
        };
      
        try {
          const response = await fetch("http://localhost:8000/getUserByEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
      
          if (response.ok) {
            const res = await response.json();
            console.log(res);
            if (res.message === "erreur") {
              setFeedback("Identifiant ou mot de passe incorrecte");
            } else {
              login({ email: values.email, name: res.user.name });
              setFeedback("Connexion réussie");
              navigate('/');
            }
          } else {
            setFeedback("Une erreur s'est produite lors de la connexion.");
          }
        } catch (error) {
          console.error(error);
          setFeedback("Erreur de connexion au serveur.");
        }
      }
      

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

                <button >Connexion</button>
                <button><Link to ="/nouveaucompte">Créer un nouveau compte</Link></button>
            </form>
        </div>
    )
}

export default Connexion;