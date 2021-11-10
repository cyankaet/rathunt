open Tea
include Tea.Result

type 'a transfer = Idle | Loading | Failed | Received of 'a

let rec result_to_list = function
  | [] -> []
  | Ok x :: xs -> x :: result_to_list xs
  | Error _ :: xs -> result_to_list xs

let make_get_request url headers action =
  let request =
    {
      Http.method' = "GET";
      headers;
      url;
      body = Web.XMLHttpRequest.EmptyBody;
      expect = Http.expectString;
      timeout = None;
      withCredentials = false;
    }
  in
  Http.request request |> Http.send action
