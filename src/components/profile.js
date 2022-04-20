import { Button, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import './Profile.css';


function Profile() {


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (


        <div>

            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Profile
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>
                
                 <div className="card">
                    <div className="card-body">
                    <div className="avatar">
                        <img
                            src="https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg"
                            className="card-img-top"
                            alt=""
                        />
                    </div>
                    <h5 className="card-title">
                        asdhajas
                    </h5>
                    <p className="card-text">
                        <span className="phone">jkldhfasj@gmail.com</span>
                    </p>
                    <p className="card-text">
                        <span className="phone">963852549</span>
                    </p>
                </div>
                <button >
                    Update Profile
                </button>
            </div>
        </Typography>
            </Popover>
           </div>

    );

}

export default Profile;