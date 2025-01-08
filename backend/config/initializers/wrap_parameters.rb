# パラメータの自動ラッピング設定
ActiveSupport.on_load(:action_controller) do
  # JSONリクエストでのパラメータラッピングを無効化
  wrap_parameters format: []
end
