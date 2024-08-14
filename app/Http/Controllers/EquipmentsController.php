<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipments = Equipment::all();

        return inertia('Equipments/IndexEquipment', [
            'equipments' => $equipments
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Equipments/CreateEquipment');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:equipments',
            'specs' => 'required|string',
            'link' => 'required|url',
        ]);

        Equipment::create($validatedData);

        return redirect()->route('equipments.index')->with('success', 'Ekipman ekleme başarılı.');
    }



    /**
     * Display the specified resource.
     */
    public function show(Equipment $equipment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equipment $equipment)
    {
        return inertia('Equipments/EditEquipment', [
            'equipment' => $equipment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Equipment $equipment)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:equipments,slug,' . $equipment->id,
            'specs' => 'required|string',
            'link' => 'required|url',
        ]);

        $equipment->update($validatedData);

        return redirect()->route('equipments.index')->with('success', 'Ekipmanı güncelleme başarılı.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $equipment = Equipment::findOrFail($id);
        $equipment->delete();

        return redirect()->route('equipments.index')->with('success', 'Ekipmanı silme başarılı.');
    }
}
