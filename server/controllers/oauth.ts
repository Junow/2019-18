import { Request, Response, NextFunction } from "express";
import { oauth } from "../config/config";
//import { loginService } from "../services/oauth";

const client_id = `${process.env.clientID}`;
const client_secret = `${process.env.clientSECRET}`;
const state = "RAMDOM_STATE";
const redirectURI = encodeURI("http://106.10.58.138/oauth/callback");

const oauth = async (req: Request, res: Response, next: NextFunction) => {
  const api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    client_id +
    "&redirect_uri=" +
    redirectURI +
    "&state=" +
    state;
  console.log(api_url);
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end(
    "<a href='" +
      api_url +
      "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
};
const oauthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export { oauth, oauthCallback };