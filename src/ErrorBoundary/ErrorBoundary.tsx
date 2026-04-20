import {Component} from "react";
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component {
    state = {
        error: null,
    };
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        const { error } = this.state;

        if (error) {
            return (
                <div className={styles.error}>
                    <p className={styles.errorIcon}>⚠️</p>
                    <h3 className={styles.errorTitle}>Something went wrong</h3>
                    <p className={styles.errorMessage}>{error.message}</p>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;