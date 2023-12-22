import styles from './Error.module.scss'

function Error (){
    return(
        <div className={styles.error}>
        <h1>Erreur 404</h1>
        </div>
    )
}

export default Error