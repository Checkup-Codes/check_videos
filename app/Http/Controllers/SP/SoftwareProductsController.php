<?php

namespace App\Http\Controllers\SP;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SP\SoftwareProduct;


class SoftwareProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $softwareProducts = SoftwareProduct::all();
        return inertia(
            'SoftwareProducts/Index',
            [
                'softwareProducts' => $softwareProducts
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('SoftwareProducts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    // In your Laravel Controller
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:software_products',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'required|string|max:255',
            'platform' => 'required|string|max:255',
            'version' => 'required|string|max:255',
            'license_key' => 'required|string|max:255|unique:software_products',
            'is_subscription' => 'required|boolean',
            'subscription_duration' => 'nullable|integer|min:0',
            'download_url' => 'required|url',
            'system_requirements' => 'required|string',
        ]);


        // Redirect with success message
        return redirect()->route('software-products.index')->with('success', 'Software product was created!');
    }




    /**
     * Display the specified resource.
     */
    public function show(SoftwareProduct $softwareProduct)
    {
        return inertia(
            'SoftwareProducts/Show',
            [
                'softwareProduct' => $softwareProduct
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SoftwareProduct $softwareProduct)
    {
        return inertia(
            'SoftwareProducts/Edit',
            [
                'softwareProduct' => $softwareProduct
            ]
        );
    }

    public function update(Request $request, SoftwareProduct $softwareProduct)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:software_products,slug,' . $softwareProduct->id,
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
            'category' => 'nullable|string|max:255',
            'version' => 'required|string|max:255',
            'platform' => 'nullable|in:Windows,Mac,Linux,Web,Mobile',
            'license_key' => 'required|string|max:255|unique:software_products,license_key,' . $softwareProduct->id,
            'is_subscription' => 'required|boolean',
            'subscription_duration' => 'nullable|integer|min:1',
            'download_url' => 'nullable|url|max:255',
            'system_requirements' => 'nullable|json',
        ]);

        $softwareProduct->update($validatedData);

        return redirect()->route('software-products.index')
            ->with('success', 'Product updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SoftwareProduct $softwareProduct)
    {
        $softwareProduct->delete();

        return redirect()->route('software-products.index')
            ->with('success', 'Listing was deleted!');
    }
}
