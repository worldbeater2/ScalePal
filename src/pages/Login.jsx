import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Footer from '@/units/Footer'
import Navbar from '@/units/Navbar'
import React from 'react'
import { Link } from 'react-router-dom'








const Login = () => {
  return (
    <>

     <Navbar/>
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] font-outfit my-1 " >

      <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6 " >
        <div className="grid gap-2 text-center">
          <h1 className="text-5xl mb-3 text-rasonblack -mt-10 font-semibold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />

          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>

          <Button type="submit" className="w-full bg-rasonblack">
            Login
          </Button>
          
          <Button variant="outline" className="w-full bg-prussianblue text-white hover:bg-carebean hover:text-white">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup">
          <a href="#" className="underline">
            Sign up
          </a>
          </Link>
        </div>
      </div>
    </div>

    <div className="hidden bg-muted lg:block max-h-[850px]">
      <img
        src="https://images.unsplash.com/photo-1719306563732-d96ebd9163e5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width="1920"
        height="1080"
        className="h-full w-full   dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>

  <Footer/>
  </>


  )
}
 //src="https://images.unsplash.com/photo-1719937075848-6c189dffdbed?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default Login;