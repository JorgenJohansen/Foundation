import { AppBar, Box, Toolbar, Typography, List, ListItem, ListItemText, Button, Drawer } from "@mui/material"
import { Close, Menu, Person } from "@material-ui/icons";

import { useState } from "react";
import { Outlet, useNavigate, } from "react-router-dom"

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const classes = {
    list: {
        display: {xs: 'none', sm:'flex'}
    },
    mobileNav: {
        display: {xs: 'flex', sm:'none'},
        color: 'white',
    },
    listItem: {
        cursor: 'pointer'
    },
    mobileListItem: {
        cursor: 'pointer',
        width: '150px',
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export default function Navbar() {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const navigate = useNavigate();
    const menuItems = [
        {
            id: 1,
            text: 'Logg inn',
            path: '/logg-inn',
        },
        {
            id: 2,
            text: 'Registrer deg',
            path: '/registrer',
        },
    ]

    const closeAndNavigate = (path) => {
        setOpen(false);
        navigate(path);
    }

    const handleLogout = () => {
        logout();
        closeAndNavigate("/logg-inn");
    }

    const getFirstName = () => {
        let name = user?.displayName;
        let nameSplit = name.split(" ");
        return nameSplit[0];
    }

    const [open, setOpen] = useState(false);
    const toggleDrawer = newOpen => () => {
        setOpen(newOpen);
    };

  return (
    <>
    <div >
        <AppBar color="primary" elevation={0}>
            <Toolbar sx={classes.spaceBetween}>
                <Box
                display="flex"
                >
                <Button 
                    variant="text"
                    onClick={toggleDrawer(true)}
                    sx={classes.mobileNav}
                >
                    <Menu />
                </Button>
                <List sx={classes.list}>
                    <ListItem
                        button="true"
                        sx={classes.listItem}
                        key={"foundation"}
                        onClick={() => navigate("/")}
                    >
                        <ListItemText primary={"Foundation"}/>
                    </ListItem>
                    <ListItem
                        button="true"
                        sx={classes.listItem}
                        key={"sovn"}
                        onClick={() => navigate("/")}
                    >
                        <ListItemText primary={"Søvn"}/>
                    </ListItem>
                    <ListItem
                        button="true"
                        sx={classes.listItem}
                        key={"todos"}
                        onClick={() => navigate("/todos")}
                    >
                        <ListItemText primary={"Todos"}/>
                    </ListItem>
                    <ListItem
                        button="true"
                        sx={classes.listItem}
                        key={"budsjetter"}
                        onClick={() => navigate("/budsjetter")}
                    >
                        <ListItemText primary={"Budsjetter"}/>
                    </ListItem>
                </List>
                </Box>
                
                <Box >
                
                <List sx={classes.list} >
                    {!user && menuItems.map(item => (
                        <div key={item.id} >
                            <ListItem 
                                button="true"
                                sx={classes.listItem}
                                key={item.text}
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        </div>
                    ))}
                    
                    {user && <ListItem 
                        button="true"
                        sx={classes.listItem}
                        key={"bruker"}
                        onClick={() => navigate("/")}
                    >
                        <ListItemText sx={{textWrap:'nowrap'}} primary={`Hei, ${getFirstName(user?.displayName)}`}/>
                        <Person />
                    </ListItem>}
                    
                    {user && <ListItem 
                        button="true"
                        sx={classes.listItem}
                        key={"logg-ut"}
                        onClick={handleLogout}
                    >
                        <ListItemText primary={"Logg ut"}/>
                    </ListItem>}
                </List>

                </Box>
            </Toolbar>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor="left"
                sx={{
                display: { xs: "inherit", sm: "none" },
                "& .MuiDrawer-paper": {
                    height: "100%",
                    width: "80%",
                },
                }}
            >
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    p: 2,
                }}
                >
                <Button onClick={toggleDrawer(false)}>
                    <Close />
                </Button>
                </Box>
                <List >
                    
                    {!user && menuItems.map(item => (
                        <div key={item.id} >
                            <ListItem 
                                button="true"
                                sx={classes.mobileListItem}
                                key={item.text}
                                onClick={() => closeAndNavigate(item.path)}
                            >
                                <ListItemText primary={item.text}/>
                            </ListItem>
                        </div>
                    ))}
                    
                    {user && <ListItem 
                        button="true"
                        sx={classes.mobileListItem}
                        key={"bruker"}
                        onClick={() => closeAndNavigate("/")}
                    >
                        <ListItemText sx={{textWrap:'nowrap'}} primary={`Hei, ${getFirstName(user?.displayname)}`}/>
                        <Person />
                    </ListItem>}
                    {user && <ListItem 
                        button="true"
                        sx={classes.mobileListItem}
                        key={"logg-ut"}
                        onClick={() => closeAndNavigate('/')}
                    >
                        <ListItemText primary={"Søvn"}/>
                    </ListItem>}
                    {user && <ListItem 
                        button="true"
                        sx={classes.mobileListItem}
                        key={"logg-ut"}
                        onClick={() => closeAndNavigate('/todos')}
                    >
                        <ListItemText primary={"Todos"}/>
                    </ListItem>}
                    
                    {user && <ListItem 
                        button="true"
                        sx={classes.mobileListItem}
                        key={"logg-ut"}
                        onClick={() => closeAndNavigate('/budsjetter')}
                    >
                        <ListItemText primary={"Budsjetter"}/>
                    </ListItem>}
                    {user && <ListItem 
                        button="true"
                        sx={classes.mobileListItem}
                        key={"logg-ut"}
                        onClick={handleLogout}
                    >
                        <ListItemText primary={"Logg ut"}/>
                    </ListItem>}
                </List>
            </Drawer>
        </AppBar>
    </div>
    <div style={{flexGrow: 1}}><Outlet /></div>
    <div>
        <Box sx={{position: 'fixed', bottom: 0, width: '100%'}}>
            <Typography sx={{background: 'black', color: 'white', padding: 3}}>@Copyright Horgitage</Typography>
        </Box>
    </div>
    </>
  )
}
