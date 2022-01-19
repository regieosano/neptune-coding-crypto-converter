import type { NextPage } from 'next'
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Web3 from 'web3';

import stylesWallet from '../../../styles/UIWalletConnection.module.css'

const UIWalletConnection: NextPage = ({isShowDialog, handleCheckWalletDetails}) => {

  let chainID, accountNo, balance;

  const handleWalletConnections = async () => {
	
		if (typeof window.ethereum !== 'undefined') {
		
			const web3 = new Web3(window.ethereum);
			try {
			
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				const accounts = await web3.eth.getAccounts();
				await web3.eth.getChainId((err, version) => {
					if (err) console.log(err)
					chainID = version
				})
				balance = await web3.eth.getBalance('0xaBE5BA3443023FD1E3fFDD6a5315EDCA0c7ce603');
				handleCheckWalletDetails();
				accountNo = accounts[0]
				console.log(accountNo)
				console.log(chainID)
				console.log(balance)
				
			} catch(e) {
		    alert(e)
			}
		}
	
	}

	return (
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
	
		
	)
}

export default UIWalletConnection