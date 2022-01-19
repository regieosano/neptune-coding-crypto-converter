import type { NextPage } from 'next'
import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import UIWalletDetails from '../Wallet/UIWalletDetails'
import Spinner from '../Utility/Spinner'

import Web3 from 'web3';

import stylesWallet from '../../../styles/UIWalletConnection.module.css'

const UIWalletConnection: NextPage = ({isShowDialog, handleCheckWalletDetails}) => {

	const [isShowWalletDetails, setIsShowWalletDetails] = React.useState(false)
	const [isProcessDetails, setIsProcessDetails] = React.useState(false)
	const [walletDetailsObj, setWalletDetailsObj] = React.useState({})

  let chainID, accountNo, balance, accountNoDisplay;

	const handleIsShowWalletDetails = () => {
		setIsShowWalletDetails(!isShowWalletDetails)
	}

  const handleWalletConnections = async () => {
	  setIsProcessDetails(true)
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum);

			try {
			  // Wallet connection
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				const accounts = await web3.eth.getAccounts();
				accountNo = accounts[0]
				accountNoDisplay = `${accountNo.substring(0, 5)}...${accountNo.slice(accountNo.length - 4)}` 
				await web3.eth.getChainId((err, version) => {
					if (err) console.log(err)
					chainID = version
				})
				balance = await web3.eth.getBalance(accountNo);
	  	
				setWalletDetailsObj({accountNoDisplay, chainID, balance})

				handleCheckWalletDetails()
				handleIsShowWalletDetails()
				setIsProcessDetails(false)
				
			} catch(e) {
		    alert(e)
			}
		} else {
			setIsProcessDetails(false)
			alert("Do you have other Wallet Accounts? ")
		}
	
	}

	return (
		<> 
		{isProcessDetails && <div className={stylesWallet.spinner}>
		  <Spinner />
		</div>} 

	  <UIWalletDetails
		    isShowWalletDetails={isShowWalletDetails}
		    walletDetailsObj={walletDetailsObj}
				handleIsShowWalletDetails={handleIsShowWalletDetails}
				handleCheckWalletDetails={handleCheckWalletDetails}
		 />
	   <Dialog open={isShowDialog} fullWidth>
       <DialogTitle>Wallet details</DialogTitle>
        <div className={stylesWallet.dialog}>
					Wallet not connected. Please click the "Connect Now" button below.
				</div>
				<div className={stylesWallet.buttons}>
				  <ButtonGroup >
				    <Button variant="primary"
						        className={stylesWallet.button_connect}
										onClick={handleWalletConnections}
						>
              Connect
            </Button>
				    <Button variant="primary"
						        className={stylesWallet.button_cancel}
						        onClick={handleCheckWalletDetails}
						>
              Cancel
            </Button>
				  </ButtonGroup>
				</div>
	    </Dialog>
		</>
		
	
		
	)
}

export default UIWalletConnection