use Mix.Config

config :phoenix_environment_settings, PhoenixEnvironmentSettings.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [host: "${HOST}", port: {:system, "PORT"}],
  cache_static_manifest: "priv/static/manifest.json",
  server: true,
  root: ".",
  version: Mix.Project.config[:version]

config :logger, level: :info

config :phoenix_environment_settings, PhoenixEnvironmentSettings.Endpoint,
  secret_key_base: "${SECRET_KEY_BASE}"

config :phoenix_environment_settings, PhoenixEnvironmentSettings.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "${DB_USER}",
  password: "${DB_PASSWORD}",
  database: "${DB_NAME}",
  hostname: "${DB_HOST}",
  pool_size: 20

config :guardian, Guardian,
  secret_key: System.get_env("GUARDIAN_SECRET_KEY")
