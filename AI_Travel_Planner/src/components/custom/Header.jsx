import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      getUserProfile(codeResp);
    },
    onError: (error) => console.log(error)
  });

  const getUserProfile = (tokenInfo) => {
    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    })
    .then((resp) => resp.json())
    .then((user) => {
      console.log('User Profile:', user);
      localStorage.setItem('user', JSON.stringify(user));
      setOpenDialog(false);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to get user profile');
    });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full">
              My Trip
            </Button>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <img src='/logo.svg' alt='logo' className="h-8 w-8" />
          Sign in With Google
        </DialogTitle>

        <DialogDescription>
          Sign in to the app with Google authentication securely
        </DialogDescription>

        <div className="mt-5">
          <Button
            onClick={login}
            className="w-full flex gap-4 items-center">
              
              
            <FcGoogle className='h-7 w-7' />
            Sign In With Google
            
          </Button>
        </div>
      </DialogHeader>


        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
