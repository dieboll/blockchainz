module Bitcoin exposing (..)

import String exposing (length)


-- 26-35 alphanumeric characters
-- begins with 1 or 3
-- two formats: P2PKH
-- P2SH
-- base58 so [a-zA-Z]


type alias Address =
    String


toAddress : String -> Maybe Address
toAddress s =
    Just s
