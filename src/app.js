// knex
const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);
// express
const app = require("express")();
const port = 3000;

// get ----------------------------------------------------

app.get("/api/v1/papers", async (req, res) => {
  try {
    let papers = {};

    // Filters
    if (req.query.title || req.query.author) {
      papers = await database("papers")
        .select()
        .where((builder) => {
          if (req.query.title)
            builder.whereILike("title", `%${req.query.title}%`);

          if (req.query.author)
            builder.whereILike("author", `%${req.query.author}%`);
        });
    } else {
      // No filters
      papers = await database("papers").select();
    }
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET a specific paper
app.get("/api/v1/papers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const papers = await database("papers").where({ id });
    if (papers.length) {
      res.status(200).json(papers);
    } else {
      res.status(404).json({
        error: `Could not find paper with id ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/api/v1/footnotes", async (req, res) => {
  try {
    const footnotes = await database("footnotes").select();
    res.status(200).json(footnotes);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET a specific footnote
app.get("/api/v1/footnotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const footnote = await database("footnotes").where({ id });
    if (footnote.length) {
      res.status(200).json(footnote);
    } else {
      res.status(404).json({
        error: `Could not find footnotes with id ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// post ----------------------------------------------------

app.post("/api/v1/papers", async (req, res) => {
  const title = req.query.title;
  const author = req.query.author;

  try {
    const id = await database("papers").insert(
      {
        title: title,
        author: author,
      },
      "id"
    );
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/api/v1/footnotes", async (req, res) => {
  const note = req.query.note;
  const paperId = req.query.paperId;

  try {
    const id = await database("footnotes").insert(
      {
        note: note,
        paper_id: paperId,
      },
      "id"
    );
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});
