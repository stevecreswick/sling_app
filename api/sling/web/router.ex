defmodule Sling.Router do
  use Sling.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Sling.Web do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
  end
end
