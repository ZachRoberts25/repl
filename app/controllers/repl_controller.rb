class ReplController < ApplicationController
    require 'openssl'
    require 'date'
    require 'base64'
    def show
    end
    def gen_token
      digest = OpenSSL::Digest.new('sha256')
      secret = 'vgk7ahok6vp2phki'
      time_created = Time.now.to_i * 1000 # convert to ms
      hmac = OpenSSL::HMAC.digest(digest, secret, time_created.to_s)
      token = {
        msg_mac: Base64.encode64(hmac).strip,
        time_created: time_created
      }
      render json: token
    end
  end
