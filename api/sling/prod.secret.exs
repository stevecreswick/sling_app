use Mix.Config

config :phoenix_environment_settings, PhoenixEnvironmentSettings.Endpoint,
  secret_key_base: "${SECRET_KEY_BASE}"

config :phoenix_environment_settings, PhoenixEnvironmentSettings.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "${DB_USER}",
  password: "${DB_PASSWORD}",
  database: "${DB_NAME}",
  hostname: "${DB_HOST}",
  pool_size: 20
