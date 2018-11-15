export default
{
  "title": "MyTestForm",
  "desc": "This is a proof of concept",
  "submit": {
    "type": "http",
    "url": "http://localhost:3001/form",
    "method": "POST",
    "buttonText": "Send"
  },
  "sections": [
    {
      "index": 0,
      "title": "Kundendaten",
      "desc": "Allgemeine Kundendaten",
      "fields": [
        {
          "type": "text",
          "name": "customer_first_name",
          "label": "Vorname",
          "placeholder": "Vornamen eingeben",
          "onChange": "wird rausgefiltert",
          "desc": "Vornamen eingeben",
          "validator": {}
        },
        {
          "type": "text",
          "name": "customer_last_name",
          "label": "Nachname",
          "placeholder": "Nachnamen eingeben"
        },
        {
          "type": "number",
          "name": "customer_age",
          "label": "Alter",
          "min": 0,
          "max": 120,
          "step": 0.5
        }
      ]
    },
    {
      "title": "Anliegen",
      "fields": [
        {
          "type": "textarea",
          "name": "issue",
          "cols": 40,
          "rows": 10,
          "label": "Anliegentext"
        }
      ]
    }
  ]
}