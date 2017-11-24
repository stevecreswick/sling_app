use Mix.Config

config :phoenix_environment_settings, PhoenixEnvironmentSettings.Endpoint,
  http: [port: System.get_env("PORT") || 4000]

# ... at the end of the file ...

# Configure your database
config :phoenix_environment_settings, PhoenixEnvironmentSettings.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_USER") || "postgres",
  password: System.get_env("DB_PASSWORD") || "postgres",
  database: System.get_env("DB_NAME") || "phoenix_environment_settings_dev",
  hostname: System.get_env("DB_HOST") || "localhost",
  pool_size: 10
