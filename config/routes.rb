Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'repl#show'
    get '/gen_token' => 'repl#gen_token'
end
