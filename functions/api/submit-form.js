export async function onRequestPost(context) {
    try {
        const data = await context.request.json();

        // Log the submission to the server-side console (visible in Cloudflare dashboard)
        console.log("New form submission:", data);

        // In a real-world scenario, you would send an email here using a service like MailChannels
        // MailChannels is free for Cloudflare Pages/Workers
        /*
        const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: "info@tubesubs.com", name: "TubeSubs" }],
              },
            ],
            from: {
              email: "no-reply@tubesubs.com",
              name: "TubeSubs Form",
            },
            subject: `New Lead: ${data.name} - ${data.business}`,
            content: [
              {
                type: "text/plain",
                value: `Name: ${data.name}\nBusiness: ${data.business}\nPhone: ${data.phone}\nEmail: ${data.email}\nMessage: ${data.message || 'N/A'}`,
              },
            ],
          }),
        });
        */

        return new Response(JSON.stringify({ success: true, message: "Form submitted successfully" }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
}
