import { Link } from "react-router-dom";
import { useState } from 'react';
import styles from "./NouveauCompte.module.scss";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

function NouveauCompte() {

    const yupSchema = yup.object({
        username: yup
        .string()
        .required("Le champ est obligatoire."),
        email: yup
        .string()
        .email("Cet email n'est pas valide")
        .required("Le champ est obligatoire."),
        confEmail: yup
        .string()
        .required("Le champ est obligatoire.")
        .oneOf(
            [yup.ref("email"), ""],
            "Les addresses mail ne correspondent pas."
        ),
        password: yup
        .string()
        .required("Ce champs est obligatoire.")
        .min(5, "Le champs doit faire au moins 5 caractères."),
        confPassword: yup
        .string()
        .required("Le champ est obligatoire.")
        .oneOf(
            [yup.ref("password"), ""],
            "Les mots de passe ne correspondent pas."
        ),
        cgu: yup
        .boolean()
        .oneOf([true], "Vous devez accepter les CGU")
    })

    const defaultValues = {
      username: "",
      email: "",
      confEmail: "",
      password: "",
      confPassword: "",
      cgu: false,
    };

    const [feedback, setFeedback] = useState("");
    const [connected, setConnected] = useState(false);


    const {
      register,
      handleSubmit,
      reset,
      control,
      formState: { errors },
    } = useForm({
      defaultValues,
      mode: "onChange",
      resolver: yupResolver(yupSchema),
    });

    async function submit(values) {
      console.log(values);
      let user = {};
      user.username = values.username;
      user.email = values.email;
      user.password = values.password;
      try {
        const response = await fetch("http://localhost:8000/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const res = await response.json()
          setConnected(true);
          if (res.message === "Mail existant") {
            setFeedback("Mail déjà existant")
          } else {
                    reset(defaultValues);
          setFeedback("L'inscription s'est bien passé.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <div className={styles.nouveauCompteMain}>
            {connected ? (
              
                <div>
                  <p>Votre compte a été crée</p>
                  <button><Link to ='/connexion'>Se Connecter</Link></button>
                </div>

            ) : (
                <form onSubmit={handleSubmit(submit)}>

                <div>
                  <label htmlFor="username">
                    Nom
                  </label>
                  <input {...register("username")} type="text" id="username" />
                  { errors?.username && <p>{errors.username.message}</p>}
                </div>
        
                <div>
                  <label htmlFor="email">
                    Addresse Mail
                  </label>
                  <input {...register("email")} type="text" id="email" />
                  { errors?.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="confEmail">
                    Confirmer Addrese Mail
                  </label>
                  <input {...register("confEmail")} type="text" id="confEmail" />
                  { errors?.confEmail && <p>{errors.confEmail.message}</p>}
                </div>
        
                <div>
                  <label htmlFor="password">
                    Mot de passe
                  </label>
                  <input {...register("password")} type="password" id="password" />
                  { errors?.password && <p>{errors.password.message}</p>}
                </div>
        
                <div>
                  <label htmlFor="confPassword">
                    Confirmer mot de passe
                  </label>
                  <input {...register("confPassword")} type="password" id="confPassword" />
                  { errors?.confPassword && <p>{errors.confPassword.message}</p>}
                </div>
        
                <div>
                  <label htmlFor="cgu">
                    <Link to ='/cgu'>CGU</Link>
                  </label>
                  <input {...register("cgu")} type="checkbox" id="cgu" />
                  { errors?.cgu && <p>{errors.cgu.message}</p>}
                </div>
        
                <button type="submit">Créer le compte</button>
        
              </form>
            )}
        </div>
    )
}

export default NouveauCompte;