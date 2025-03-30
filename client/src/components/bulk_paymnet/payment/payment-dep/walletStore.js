import useWalletStore from "../../../../store/useWalletStore";

export const useWallet = () => {
    const {
        walletConnected,
        selectedWallet,
        account,
        isConnecting,
        connectWallet,
        checkWalletStatus,
    } = useWalletStore();

    return {
        walletConnected,
        selectedWallet,
        account,
        isConnecting,
        connectWallet,
        checkWalletStatus,
    };
};