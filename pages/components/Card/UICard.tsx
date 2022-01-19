import type { NextPage } from 'next'
import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl, { useFormControl } from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

import stylesCard from '../../../styles/UICard.module.css'
import { AutorenewRounded } from '@mui/icons-material'

import UIWalletConnection from '../Wallet/UIWalletConnection'

const UICard: NextPage = () => {

	 const [isShowDialog, setIsShowDialog] = React.useState(false);
	 const [nepValue, setNepValue] = React.useState('')
	 const [busdValue, setbusdValue] = React.useState('')

   const handleOnChangeValueNEP = (e) => {
		  setNepValue(e.target.value)
		  const budsValue = Number(e.target.value) * 3
			if (budsValue === 0) {
				setbusdValue("")
			} else {
				setbusdValue(budsValue.toFixed(2))
			}
     
	 }

	 const handleOnChangeValueBUSD = (e) => {
		setbusdValue(e.target.value)
		const nepValue = Number(e.target.value) / 3
		if (nepValue === 0) {
			setNepValue("")
		} else {
			setNepValue(nepValue.toFixed(2))
		}
   }

	 const handleCheckWalletDetails = () => {
		  setIsShowDialog(!isShowDialog)
	 }


   return (
		 <>
		   <UIWalletConnection 
			 		  isShowDialog={isShowDialog}
						handleCheckWalletDetails={handleCheckWalletDetails}
	  	/>
		   <div className={stylesCard.top_title}>
		     <Typography variant="h5" gutterBottom component="div">
            NEPTUNE MUTUAL 
         </Typography>
		   </div>
		 
		   <Card sx={{ minWidth: 500, minHeight: 500 }} className={stylesCard.card_padding}>
		     <CardContent>
			      <div>
				      <h1 className={stylesCard.title}>Crypto converter</h1>
			  	  </div>
		      	<FormHelperText className={stylesCard.helperText}>
			 			  {`NEP`}
			      </FormHelperText>
			  	  <FormControl fullWidth onChange={(e) => handleOnChangeValueNEP(e)}>
			  		  <OutlinedInput value={nepValue}/>
            </FormControl>
			      <div className={stylesCard.exchange}>
			 	  	  <AutorenewRounded fontSize='large'/>
			  	  </div>
		  		  <FormHelperText className={stylesCard.helperText}>
			  		  {`BUSD`}
			      </FormHelperText>
			  	  <FormControl fullWidth onChange={(e) => handleOnChangeValueBUSD(e)}>
			  		  <OutlinedInput value={busdValue}/>
            </FormControl>
	     	  </CardContent>
		      <CardActions style={{justifyContent: 'center'}} className={stylesCard.wallet_details}>
	  	    	<Button size="small"
						        onClick={() => handleCheckWalletDetails()}
						>
								 Check Wallet Details
						</Button>
		 	    </CardActions>
    	 </Card>
		 </>
		
	 )
}

export default UICard
