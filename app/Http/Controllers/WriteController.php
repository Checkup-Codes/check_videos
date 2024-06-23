<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWriteRequest;
use App\Http\Requests\UpdateWriteRequest;
use Illuminate\Http\Request;
use App\Models\Write;

class WriteController extends Controller
{
    public function index()
    {
        $writes = Write::all();

        return inertia(
            'Write/IndexWrite',
            [
                'writes' => $writes,
            ]
        );
    }

    public function indexApi()
    {
        $writes = Write::all();

        return response()->json([
            'writes' => $writes,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Write/CreateWrite');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:writes,slug',
            'content' => 'required',
            'author_id' => 'required|exists:users,id',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
        ]);

        Write::create($request->all());

        return redirect()->route('writes.index')->with('success', 'Write created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $write = Write::where('slug', $slug)->firstOrFail();
        return inertia('Write/ShowWrite', [
            'write' => $write,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $write = Write::findOrFail($id);
        return inertia('Write/EditWrite', ['write' => $write]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:writes,slug,' . $id,
            'content' => 'required',
            'author_id' => 'required|exists:users,id',
            'published_at' => 'nullable|date',
            'summary' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'cover_image' => 'nullable|string|max:255',
        ]);

        $write = Write::findOrFail($id);
        $write->update($request->all());

        return redirect()->route('writes.index')->with('success', 'Write created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $write = Write::findOrFail($id);
        $write->delete();

        return redirect()->route('writes.index')->with('success', 'Write deleted successfully.');
    }
}
