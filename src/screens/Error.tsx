import React from 'react';

function Error({ errorMsg = "Oops, Something went wrong!" }) {
	console.log(errorMsg)
	return (
		<div>
			{errorMsg}
		</div>
	)
}

export default Error;
