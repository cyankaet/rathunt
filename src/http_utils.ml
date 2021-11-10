open Tea
include Tea.Result

type 'a transfer = Idle | Loading | Failed | Received of 'a

let rec result_to_list = function
  | [] -> []
  | Ok x :: xs -> x :: result_to_list xs
  | Error _ :: xs -> result_to_list xs

let result_to_string = function Ok x -> x | Error _ -> ""

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

let make_post_request url headers body action =
  let request =
    {
      Http.method' = "POST";
      headers;
      url;
      body = Web.XMLHttpRequest.FormListBody body;
      expect = Http.expectString;
      timeout = None;
      withCredentials = false;
    }
  in
  Http.request request |> Http.send action
