export const handleCopy = (account, setCopied) => {
    if (account) {
        navigator.clipboard.writeText(account);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
};

export const checkWalletStatus = (checkStatusFn) => {
    useEffect(() => {
        checkStatusFn();
    }, []);
};