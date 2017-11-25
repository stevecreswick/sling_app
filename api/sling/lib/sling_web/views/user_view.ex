defmodule Sling.Web.UserView do
  use Sling.Web, :view
  alias Sling.Web.UserView

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      email: user.email,
      password_hash: user.password_hash}
  end
end
