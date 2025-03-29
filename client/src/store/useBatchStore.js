import { create } from "zustand"

const useBatchStore = create((set) => ({
  csvData: [],
  fileName: "",
  isLoading: false,
  error: "",
  searchTerm: "",
  sortConfig: { key: null, direction: "ascending" },
  selectedRows: [],
  isDeploying: false,
  deploymentSuccess: false,

  setCsvData: (data) => set({ csvData: data }),
  setFileName: (name) => set({ fileName: name }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (errorMsg) => set({ error: errorMsg }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSortConfig: (config) => set({ sortConfig: config }),
  setSelectedRows: (rows) => set({ selectedRows: rows }),
  setIsDeploying: (deploying) => set({ isDeploying: deploying }),
  setDeploymentSuccess: (success) => set({ deploymentSuccess: success }),

  clearData: () =>
    set({
      csvData: [],
      fileName: "",
      error: "",
      selectedRows: [],
      deploymentSuccess: false,
    }),
}));

export default useBatchStore;