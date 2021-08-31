import styles from '../styles/Footer.module.css'
import Link from 'next/dist/client/link'
import {useRouter} from 'next/router'
const Footer = () => {
    const router = useRouter();
    return (
        <div className={styles.mainContainer}>
            <p>Copyright &copy; DJ Events 2021</p>
            {router.pathname !== '/about' &&  <Link href='/about'>About This Project</Link>}
        </div>
    )
}

export default Footer
