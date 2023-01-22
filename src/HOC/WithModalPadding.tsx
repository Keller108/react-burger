import styles from './WithModalPadding.module.css';

type Props = {
    children: JSX.Element | null;
};

export const WithModalPadding = ({ children }: Props) => {
    return (
        <div className={styles.withModalPadding}>{children}</div>
    )
}