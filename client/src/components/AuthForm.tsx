import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { Loader2, Phone, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface AuthFormsProps {
  onSuccess: () => void;
}

const SignInForm = ({ onSuccess }: AuthFormsProps) => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpHasSent, setOtpHasSent] = useState(false);
  const [inputOTP, setInputOTP] = useState("");
  const { handleLogin } = useAuth();

  const url = `${import.meta.env.VITE_API_URL}/auth`;

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (otpHasSent) {
        const res = await fetch(`${url}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: Number(phone), otp: Number(inputOTP) }),
        });
        const data = await res.json();
        if (data.status === "success") {
          handleLogin(data.user, data.token);
          onSuccess();
        }
      } else {
        const res = await fetch(`${url}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: Number(phone) }),
        });
        const data = await res.json();

        if (data.status === "success") {
          setOtpHasSent(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="signin" className="space-y-4 mt-6">
      <form onSubmit={handleSignin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signin-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10 rounded-xl"
              required
            />
          </div>
        </div>
        {otpHasSent && (
          <div className="space-y-2 flex flex-col items-center">
            <Label className="w-full" htmlFor="signin-phone">
              Please Enter your OTP :
            </Label>

            <div className="">
              <InputOTP
                maxLength={6}
                value={inputOTP}
                onChange={(value) => setInputOTP(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full rounded-xl"
          size="lg"
          disabled={isLoading || !phone}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </TabsContent>
  );
};
const SignUpForm = ({ onSuccess }: AuthFormsProps) => {
  const [signupData, setSignupData] = useState({ name: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [otpHasSent, setOtpHasSent] = useState(false);
  const [inputOTP, setInputOTP] = useState("");
  const { handleLogin } = useAuth();

  const url = `${import.meta.env.VITE_API_URL}/auth`;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (otpHasSent) {
        const res = await fetch(`${url}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: Number(signupData.phone),
            otp: Number(inputOTP),
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          handleLogin(data.user, data.token);
          onSuccess();
        }
      } else {
        const res = await fetch(`${url}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: signupData.name,
            phone: Number(signupData.phone),
          }),
        });
        const data = await res.json();

        if (data.status === "success") {
          setOtpHasSent(true);
        }
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="signup" className="space-y-4 mt-6">
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-name"
              type="text"
              placeholder="John Doe"
              value={signupData.name}
              onChange={(e) =>
                setSignupData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="pl-10 rounded-xl"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={signupData.phone}
              onChange={(e) =>
                setSignupData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              className="pl-10 rounded-xl"
              required
            />
          </div>
        </div>
        {/* otp */}

        {otpHasSent && (
          <div className="space-y-2 flex flex-col items-center">
            <Label className="w-full" htmlFor="signin-phone">
              Please enter your OTP:
            </Label>

            <InputOTP
              maxLength={6}
              value={inputOTP}
              onChange={(value) => setInputOTP(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        )}
        <Button
          type="submit"
          className="w-full rounded-xl"
          size="lg"
          disabled={isLoading || !signupData.name || !signupData.phone}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </TabsContent>
  );
};

export const AuthForms = ({ onSuccess }: AuthFormsProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="rounded-2xl border-0 shadow-soft">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome to Essentials
          </CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            {/* signin & signup */}
            <TabsList className="grid w-full grid-cols-2 rounded-xl">
              <TabsTrigger value="signin" className="rounded-lg">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg">
                Sign Up
              </TabsTrigger>
            </TabsList>
            {/* signin */}
            <SignInForm onSuccess={onSuccess} />
            {/* signup */}
            <SignUpForm onSuccess={onSuccess} />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
