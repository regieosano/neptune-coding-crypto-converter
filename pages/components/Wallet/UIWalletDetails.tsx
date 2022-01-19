import type { NextPage } from 'next'
import * as React from 'react';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import stylesDetails from '../../../styles/UIWalletDetails.module.css'

const UIWalletDetails: NextPage = (
	{isShowWalletDetails, walletDetailsObj, handleIsShowWalletDetails, handleCheckWalletDetails}) => {

	const handleWalletDisconnect = () => {
      handleIsShowWalletDetails()
			handleCheckWalletDetails()
	}

	return (
		<>
			<Dialog open={isShowWalletDetails} fullWidth>
	     	<DialogTitle>Wallet details</DialogTitle>
        <TableContainer component={Paper}>
           <Table>
             <TableHead>
               <TableRow>
                 <TableCell align="left">Key</TableCell>
                 <TableCell align="right">Value</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
				       <TableRow>
					       <TableCell align="left">Account</TableCell>
				         <TableCell align="right">
								  	{walletDetailsObj.accountNoDisplay}
								 </TableCell>
					      </TableRow>
			          <TableRow>
					        <TableCell align="left">Chain ID</TableCell>
					        <TableCell align="right">
									  {walletDetailsObj.chainID}
								  </TableCell>
					      </TableRow> 
                <TableRow>
				          <TableCell align="left">Balance</TableCell>
					        <TableCell align="right">
									  {walletDetailsObj.balance}
								  </TableCell>
					      </TableRow>   
              </TableBody>
           </Table>
         </TableContainer>
				 <Button 
				    className={stylesDetails.disconnect}
						onClick={() => handleWalletDisconnect()}		       
				 >
            Disconnect
         </Button>
	    </Dialog>
		</>
	
	)
  
}

export default UIWalletDetails