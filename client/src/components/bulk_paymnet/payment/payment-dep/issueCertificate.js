import useIssueCertificateOnBlockChain from "../../../store/useIssueCertificateOnBlockChain";

export const useIssueCertificate = () => {
    const {
        loading,
        txHash,
        walletAddress,
        issueCertificate,
    } = useIssueCertificateOnBlockChain();

    return {
        loading,
        txHash,
        walletAddress,
        issueCertificate,
    };
};