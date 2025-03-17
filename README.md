
# CertifyMe - Bulk Certificate Generation and Verification Platform

CertifyMe is a React-based application that enables users to efficiently generate, download, and verify certificates for events, programs, or courses. The platform leverages web3 technologies for secure verification, utilizing Solidity smart contracts and Ethereum-based solutions.

## Features

- **Bulk Certificate Creation**: Upload CSV files with recipient details to create certificates in bulk.
- **Downloadable PDFs**: Generate certificates as PDF files that can be downloaded.
- **Blockchain Verification**: Leverages smart contracts to ensure certificate authenticity, providing verifiable proof on the Ethereum network.
- **User-Friendly Interface**: Simple and intuitive interface with support for data import via CSV, making it easy to generate and manage multiple certificates.
- **Web3 Integration**: Integrates with MetaMask and Infura for blockchain interaction, allowing easy connectivity and verification.

## Tech Stack

- **Frontend**: React
- **Libraries**:
  - `jspdf`: PDF generation for certificates
  - `jszip`: Zip file creation to download certificates in bulk
  - `html2canvas`: Screenshot capture for rendering HTML elements as images in certificates
  - `papaparse`: CSV parsing for recipient data
- **Blockchain**:
  - **Solidity**: Smart contracts for certificate verification
  - **MetaMask**: Wallet integration for blockchain interaction
  - **Infura**: API for interacting with the Ethereum network

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/certifyme.git
   cd certifyme
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and configure your Infura project ID and any other required keys.

   ```plaintext
   REACT_APP_INFURA_PROJECT_ID=your_project_id
   ```

4. **Compile and deploy the Solidity contract**:
   Ensure you have a development environment for smart contracts (e.g., [Truffle](https://www.trufflesuite.com/truffle) or [Hardhat](https://hardhat.org/)).

   ```bash
   truffle compile
   truffle migrate --network rinkeby # or another network
   ```

5. **Start the development server**:
   ```bash
   npm start
   ```

## Usage

1. **Upload CSV**: Use the CSV upload feature to bulk import recipient details.
2. **Generate Certificates**: Configure certificate design, then bulk-generate PDFs using `jspdf` and `html2canvas`.
3. **Download Certificates**: Download all certificates as a single ZIP file.
4. **Verify Certificates**: Each certificate can be verified on the blockchain, ensuring it remains tamper-proof.

## Project Structure

- **/src/components**: UI components, including form fields, certificate templates, and buttons.
- **/src/contracts**: Solidity smart contract files.
- **/src/services**: Helper services for blockchain interaction, file handling, etc.
- **/src/utils**: Utility functions for CSV parsing, PDF generation, and ZIP handling.

## Libraries and Dependencies

- **jspdf**: Generate PDF files from HTML templates.
- **jszip**: Bundle PDFs into ZIP files for easy bulk download.
- **html2canvas**: Render HTML elements as images to enhance PDF generation.
- **papaparse**: Parse CSV files for bulk recipient information.
- **web3**: Connect with blockchain nodes, such as Infura, to enable contract interactions.
- **MetaMask**: Securely interact with the Ethereum blockchain from the browser.

## Contributing

We welcome contributions to improve and extend this project! To get started:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.


