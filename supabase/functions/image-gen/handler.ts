

import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js'
import { createAvatar } from 'https://cdn.skypack.dev/@dicebear/core';
import { avataaars } from 'https://cdn.skypack.dev/@dicebear/collection';
import { render } from "https://deno.land/x/resvg_wasm/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const STORAGE_URL = 'https://voiveotahokxlxpsrrub.supabase.co/storage/v1/object/public/avatars/'

export async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  console.log('Calling the image-gen function');
  try {
    const requestBody = await req.json();
    const fullName = requestBody.name;
    const contactId = requestBody.contactId;

    const supabaseAdminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const ava = createAvatar(avataaars, {
      seed: fullName
    });

    console.log('ava', ava.toString());

    const generatedImage = await render(ava.toString());

    const fileName = `${encodeURIComponent(fullName)}.png`;

    // Upload image to storage.
    const { error: uploadError } = await supabaseAdminClient.storage
      .from('avatars')
      .upload(fileName, generatedImage, {
        contentType: 'image/png',
        cacheControl: '31536000',
        upsert: true,
      })
    if (uploadError) throw uploadError

    const imageUrl = `${STORAGE_URL}${fileName}`;

    // Update the avatar_url field for the user in the 'contacts' table
    const { error: updateError } = await supabaseAdminClient
      .from('contacts')
      .update({ avatar_url: imageUrl })
      .eq('id', contactId);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ success: true, url: imageUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.log('error', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
}
